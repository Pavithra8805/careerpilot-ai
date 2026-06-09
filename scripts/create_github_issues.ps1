param(
    [string]$Owner = "Pavithra8805",
    [string]$Repo = "careerpilot-ai"
)

# $GITHUB_TOKEN is preferred (exported in your environment). If not set, you'll be prompted.
$token = $env:GITHUB_TOKEN
if (-not $token) {
    $token = Read-Host "Enter your GitHub personal access token (repo scope)"
}

$issues = @(
    @{ title = 'Frontend Development'; body = @'
- Implement the Next.js frontend in `/web` with basic pages: Home, Dashboard, Resume, Tracker, Contact.
- Add styling using Tailwind CSS (or your chosen CSS framework).
- Include components for auth flows (signup/login) and a protected `Dashboard` page.
'@; labels = @('enhancement') },

    @{ title = 'Backend Development'; body = @'
- Implement the Express backend in `/api` with endpoints for auth, resume review (AI), applications CRUD, and contact form handling.
- Add a PostgreSQL schema (migrations or SQL) for users, applications, and contact submissions.
'@; labels = @('enhancement') },

    @{ title = 'Frontend-Backend Integration'; body = @'
- Connect the frontend to the backend APIs: auth, application tracker, resume review, and contact form.
- Add environment config instructions and example `.env` values.
'@; labels = @('enhancement') },

    @{ title = 'Readme update with overview'; body = @'
- Update the repository `README.md` with project description, tech stack, run instructions, and team contributors.
- Ensure the README includes the deployed URL (when available) and the Day 10 submission checklist.
'@; labels = @('documentation') }
)

function Create-Issue($issue) {
    $url = "https://api.github.com/repos/$Owner/$Repo/issues"
    $payload = @{ title = $issue.title; body = $issue.body; labels = $issue.labels }
    $json = $payload | ConvertTo-Json -Depth 6
    Write-Host "Creating issue:`t$($issue.title)"
    try {
        $resp = Invoke-RestMethod -Method Post -Uri $url -Headers @{ Authorization = "token $token"; 'User-Agent' = 'CareerPilotAI-Script' } -Body $json -ContentType 'application/json'
        Write-Host "Created:`t$($resp.html_url)"
    } catch {
        Write-Host "Error creating issue $($issue.title): $($_.Exception.Message)"
    }
}

foreach ($iss in $issues) { Create-Issue $iss }

Write-Host "Done. Open your repository Issues tab to verify created issues."
