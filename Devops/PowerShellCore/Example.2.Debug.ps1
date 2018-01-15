# 1. Setting a Breakpoint on a Line
#   Open a PowerShell editor
#   Save the above code snippet to a file. For example, "test.ps1"
#   Go to your command-line PowerShell
#   Clear existing breakpoints if any

#PS Get-PSBreakpoint | Remove-PSBreakpoint

#Use Set-PSBreakpoint cmdlet to set a debug breakpoint. In this case, we will set it to line 5

#PS Set-PSBreakpoint -Line 21 -Script ./Example.2.Debug.ps1

#  The PowerShell prompt now has the prefix [DBG]: as you may have noticed. This means we have entered into the debug mode. To watch the variables like $celsius, simply type $celsius as below.
#  To exit from the debugging, type q
#  To get help for the debugging commands, simply type ?. The following is an example of debugging output.

# Convert Fahrenheit to Celsius
function ConvertFahrenheitToCelsius([double] $fahrenheit)
{
$celsius = $fahrenheit - 32
$celsius = $celsius / 1.8
$celsius
}

$fahrenheit = Read-Host 'Input a temperature in Fahrenheit'
$result =[int](ConvertFahrenheitToCelsius($fahrenheit))
Write-Host "$result Celsius"