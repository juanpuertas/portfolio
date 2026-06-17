Add-Type -AssemblyName System.Drawing
$cropY = 85

$files = @(
    "C:\Users\Yojan\.gemini\antigravity-ide\brain\ba8da3ac-e135-4678-98ab-f86de7162f5c\media__1781665653051.png"
)
$outputNames = @(
    "sae-control-acceso.png"
)

for ($i=0; $i -lt $files.Length; $i++) {
    $img = [System.Drawing.Image]::FromFile($files[$i])
    $rect = New-Object System.Drawing.Rectangle(0, $cropY, $img.Width, ($img.Height - $cropY))
    $bmp = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.DrawImage($img, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $bmp.Save("C:\Users\Yojan\Desktop\DESARROLLO\portfolio\public\projects\work\" + $outputNames[$i], [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $img.Dispose()
    Write-Host ("Cropped " + $outputNames[$i])
}
