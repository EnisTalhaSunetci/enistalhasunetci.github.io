$jsonPath = "C:\Users\Enis\Desktop\siteData (1).json"
$outJsonPath = "C:\Users\Enis\.gemini\antigravity\scratch\portfolio\cleaned_data.json"
$publicDir = "C:\Users\Enis\.gemini\antigravity\scratch\portfolio\public"
$photosDir = "$publicDir\photos"

if (-not (Test-Path $photosDir)) {
    New-Item -ItemType Directory -Force -Path $photosDir | Out-Null
}

$jsonContent = Get-Content $jsonPath -Raw -Encoding UTF8
$data = $jsonContent | ConvertFrom-Json

$global:counter = 1
$global:extractedFiles = @()

function Save-Base64 {
    param([string]$base64Str, [string]$propName)
    
    $sepIdx = $base64Str.IndexOf(";base64,")
    if ($sepIdx -le 0) { return $null }
    
    $mimeType = $base64Str.Substring(5, $sepIdx - 5)
    $b64Data = $base64Str.Substring($sepIdx + 8)
    
    try {
        $bytes = [Convert]::FromBase64String($b64Data)
    } catch {
        Write-Host "WARN: Could not decode base64 for '$propName', skipping"
        return $null
    }
    
    if ($mimeType -match "application/pdf" -or $propName -eq "cvUrl") {
        $fileName = "cv.pdf"
        $filePath = Join-Path $publicDir $fileName
        $urlPath = "/$fileName"
    } else {
        $ext = "jpg"
        if ($mimeType -match "image/png") { $ext = "png" }
        elseif ($mimeType -match "image/gif") { $ext = "gif" }
        elseif ($mimeType -match "image/svg") { $ext = "svg" }
        elseif ($mimeType -match "image/webp") { $ext = "webp" }
        
        $fileName = "admin_upload_$($global:counter).$ext"
        $global:counter++
        $filePath = Join-Path $photosDir $fileName
        $urlPath = "/photos/$fileName"
    }
    
    [IO.File]::WriteAllBytes($filePath, $bytes)
    $global:extractedFiles += "$propName -> $urlPath ($($bytes.Length) bytes)"
    Write-Host "Extracted: $propName -> $urlPath ($($bytes.Length) bytes)"
    return $urlPath
}

function Process-Value {
    param($obj)
    
    if ($null -eq $obj) { return }
    
    if ($obj -is [PSCustomObject]) {
        $propNames = @($obj.psobject.properties.Name)
        foreach ($pn in $propNames) {
            $val = $obj.$pn
            if ($val -is [string] -and $val.StartsWith("data:")) {
                $newPath = Save-Base64 $val $pn
                if ($newPath) { $obj.$pn = $newPath }
            } elseif ($val -is [System.Collections.IEnumerable] -and -not ($val -is [string])) {
                # It's an array - check each element
                $arr = @($val)
                $changed = $false
                for ($i = 0; $i -lt $arr.Count; $i++) {
                    $item = $arr[$i]
                    if ($item -is [string] -and $item.StartsWith("data:")) {
                        $newPath = Save-Base64 $item "array[$i]"
                        if ($newPath) { 
                            $arr[$i] = $newPath
                            $changed = $true
                        }
                    } elseif ($item -is [PSCustomObject]) {
                        Process-Value $item
                    }
                }
                if ($changed) {
                    # Rebuild array property
                    $obj.$pn = $arr
                }
            } elseif ($val -is [PSCustomObject]) {
                Process-Value $val
            }
        }
    }
}

Write-Host "Processing JSON..."
Process-Value $data

Write-Host ""
Write-Host "Extracted $($global:extractedFiles.Count) base64 files total"

Write-Host ""
Write-Host "Writing cleaned JSON..."
$data | ConvertTo-Json -Depth 100 -Compress | Out-File -FilePath $outJsonPath -Encoding utf8
$finalSize = (Get-Item $outJsonPath).Length
Write-Host "Done! Cleaned JSON saved: $outJsonPath ($finalSize bytes)"
