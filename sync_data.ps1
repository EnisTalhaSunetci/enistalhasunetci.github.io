
# Sync admin panel export to defaultData.ts
# 1. Extract base64 files (photos, CV) to public/
# 2. Replace base64 data URIs with file paths in JSON
# 3. Generate updated defaultData.ts

$ErrorActionPreference = "Stop"
$projectDir = "C:\Users\Enis\.gemini\antigravity\scratch\portfolio"
$inputJson = Join-Path $projectDir "siteData_export.json"
$outputJson = Join-Path $projectDir "cleaned_data2.json"
$photosDir = Join-Path $projectDir "public\photos"
$publicDir = Join-Path $projectDir "public"

if (-not (Test-Path $photosDir)) { New-Item -ItemType Directory -Path $photosDir -Force | Out-Null }

$rawText = [System.IO.File]::ReadAllText($inputJson, [System.Text.Encoding]::UTF8)
# Remove BOM
if ($rawText[0] -eq [char]0xFEFF) { $rawText = $rawText.Substring(1) }

$fileCounter = 1

# Function to extract base64 and replace with file path
function Process-Base64 {
    param([string]$text)
    
    $script:fileCounter = 1
    
    # Match data:image/xxx;base64,... and data:application/pdf;base64,...
    $pattern = 'data:(image\/[a-zA-Z]+|application\/pdf);base64,[A-Za-z0-9+/=]+'
    
    $result = [regex]::Replace($text, $pattern, {
        param($match)
        $dataUri = $match.Value
        $mimeType = $match.Groups[1].Value
        
        # Determine extension
        switch -Wildcard ($mimeType) {
            "image/jpeg" { $ext = ".jpg" }
            "image/jpg"  { $ext = ".jpg" }
            "image/png"  { $ext = ".png" }
            "image/webp" { $ext = ".webp" }
            "image/gif"  { $ext = ".gif" }
            "application/pdf" { $ext = ".pdf" }
            default { $ext = ".bin" }
        }
        
        # Extract base64 data
        $base64Data = $dataUri.Substring($dataUri.IndexOf(",") + 1)
        $bytes = [Convert]::FromBase64String($base64Data)
        
        if ($ext -eq ".pdf") {
            $filePath = Join-Path $publicDir "cv.pdf"
            $webPath = "/cv.pdf"
        } else {
            $fileName = "admin_upload_$($script:fileCounter)$ext"
            $filePath = Join-Path $photosDir $fileName
            $webPath = "/photos/$fileName"
            $script:fileCounter++
        }
        
        [System.IO.File]::WriteAllBytes($filePath, $bytes)
        Write-Host "Extracted: $webPath ($($bytes.Length) bytes)"
        
        return $webPath
    })
    
    return $result
}

Write-Host "Processing base64 data..."
$cleanedText = Process-Base64 $rawText

# Parse and fix the SEO title
$data = $cleanedText | ConvertFrom-Json

# Fix Stratejist -> Portfolyo in SEO
if ($data.seo -and $data.seo.homepage -and $data.seo.homepage.title -match "Stratejist") {
    $data.seo.homepage.title = $data.seo.homepage.title -replace "Stratejist", "Portfolyo"
    Write-Host "Fixed SEO title: Stratejist -> Portfolyo"
}

# Convert back to JSON
$finalJson = $data | ConvertTo-Json -Depth 20 -Compress
[System.IO.File]::WriteAllText($outputJson, $finalJson, [System.Text.Encoding]::UTF8)

Write-Host "`nCleaned JSON saved to: $outputJson"
Write-Host "Size: $((Get-Item $outputJson).Length) bytes"
