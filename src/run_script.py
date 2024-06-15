import subprocess

def script():
    result = subprocess.run(['node', 'script.js'], capture_output=True, text=True)
    print("STDOUT:\n", result.stdout)
    print("STDERR:\n", result.stderr)
    return result.stdout, result.stderr

stdout, stderr = script()
