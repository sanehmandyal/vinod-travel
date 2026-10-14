Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\admin\.gemini\antigravity\brain\4ffab6dd-3174-4219-9a6d-f62df799d720\.user_uploaded\media_1791968823232_3b4c1904.jpg"
$clientPublic = "c:\Users\admin\Downloads\vinod-tour-travels-updated\vinod-tour-travels\client\public"
$imagesDir = Join-Path $clientPublic "images"

if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
}

# 1. Direct copies
Copy-Item $srcPath (Join-Path $clientPublic "logo.jpg") -Force
Copy-Item $srcPath (Join-Path $imagesDir "logo.jpg") -Force

# Load source bitmap
$srcBmp = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Output "Source Dimensions: $($srcBmp.Width) x $($srcBmp.Height)"

function Generate-ResizedImage {
    param (
        [System.Drawing.Image]$Source,
        [int]$Width,
        [int]$Height,
        [string]$TargetPath
    )

    $destRect = New-Object System.Drawing.Rectangle(0, 0, $Width, $Height)
    $destBmp = New-Object System.Drawing.Bitmap($Width, $Height)
    $destBmp.SetResolution($Source.HorizontalResolution, $Source.VerticalResolution)
    $graphics = [System.Drawing.Graphics]::FromImage($destBmp)
    $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
    $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $graphics.DrawImage($Source, $destRect, 0, 0, $Source.Width, $Source.Height, [System.Drawing.GraphicsUnit]::Pixel)
    $graphics.Dispose()
    
    $destBmp.Save($TargetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $destBmp.Dispose()
    Write-Output "Successfully Generated: $TargetPath ($Width x $Height)"
}

# Optimized logo for header and footer (96x96 retina, super lightweight ~15KB)
Generate-ResizedImage -Source $srcBmp -Width 96 -Height 96 -TargetPath (Join-Path $clientPublic "logo-sm.png")
Generate-ResizedImage -Source $srcBmp -Width 96 -Height 96 -TargetPath (Join-Path $imagesDir "logo-sm.png")

# Main logo (512x512, high quality, ~150KB instead of 760KB)
Generate-ResizedImage -Source $srcBmp -Width 512 -Height 512 -TargetPath (Join-Path $clientPublic "logo.png")
Generate-ResizedImage -Source $srcBmp -Width 512 -Height 512 -TargetPath (Join-Path $imagesDir "logo.png")

# Favicon sizes
Generate-ResizedImage -Source $srcBmp -Width 32 -Height 32 -TargetPath (Join-Path $clientPublic "favicon-32x32.png")
Generate-ResizedImage -Source $srcBmp -Width 192 -Height 192 -TargetPath (Join-Path $clientPublic "favicon-192x192.png")
Generate-ResizedImage -Source $srcBmp -Width 180 -Height 180 -TargetPath (Join-Path $clientPublic "apple-touch-icon.png")
Generate-ResizedImage -Source $srcBmp -Width 256 -Height 256 -TargetPath (Join-Path $clientPublic "favicon.png")
Generate-ResizedImage -Source $srcBmp -Width 48 -Height 48 -TargetPath (Join-Path $clientPublic "favicon.ico")

$srcBmp.Dispose()
Write-Output "All icons and logos ready and optimized!"
