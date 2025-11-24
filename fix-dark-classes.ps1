# Fix duplicate dark: classes in HTML files
$files = @(
    "src\index.html",
    "src\about.html", 
    "src\services.html",
    "src\work.html"
)

foreach ($file in $files) {
    Write-Host "Processing $file..."
    $content = Get-Content $file -Raw
    
    # Fix duplicate dark: text classes
    $content = $content -replace 'dark:text-gray-900 dark:text-gray-900 dark:text-white', 'dark:text-white'
    $content = $content -replace 'dark:text-gray-900 dark:text-white', 'dark:text-white'
    $content = $content -replace 'dark:text-gray-700 dark:text-zinc-300', 'dark:text-zinc-300'
    $content = $content -replace 'dark:text-gray-600 dark:text-gray-600 dark:text-zinc-400', 'dark:text-zinc-400'
    $content = $content -replace 'dark:text-gray-600 dark:text-zinc-400', 'dark:text-zinc-400'
    $content = $content -replace 'dark:text-gray-500 dark:text-zinc-500', 'dark:text-zinc-500'
    $content = $content -replace 'dark:text-gray-400 dark:text-zinc-600', 'dark:text-zinc-600'
    $content = $content -replace 'dark:text-gray-300 dark:text-zinc-700', 'dark:text-zinc-700'
    
    # Fix duplicate dark: background classes
    $content = $content -replace 'dark:bg-gray-50 dark:bg-zinc-900/80', 'dark:bg-zinc-900/80'
    $content = $content -replace 'dark:bg-gray-100 dark:bg-zinc-900/10', 'dark:bg-zinc-900/10'
    
    # Fix duplicate dark: border classes
    $content = $content -replace 'dark:border-gray-200 dark:border-zinc-900/50', 'dark:border-zinc-900/50'
    $content = $content -replace 'dark:border-gray-200 dark:border-zinc-900', 'dark:border-zinc-900'
    $content = $content -replace 'dark:border-gray-300 dark:border-zinc-800', 'dark:border-zinc-800'
    $content = $content -replace 'dark:border-gray-400 dark:border-zinc-700', 'dark:border-zinc-700'
    
    # Fix missing spaces
    $content = $content -replace 'border-zinc-700hover:', 'border-zinc-700 hover:'
    $content = $content -replace 'border-zinc-800rounded-full', 'border-zinc-800 rounded-full'
    
    # Save the file
    $content | Set-Content $file -NoNewline
    Write-Host "✓ Fixed $file"
}

Write-Host "`nAll files processed! Run 'npm run build' to rebuild."
