# AWS Cost Bot

A fully testable AWS Lambda solution (with Infrastructure-as-Code via CDKTF) that generates a daily cost summary in Markdown table format—future-ready for Slack or other chat posting.

---

## 📦 Project Structure

```
aws-cost-bot/
├── lambda_module/
│   ├── handler.py       # Lambda function code (Python)
│   └── __init__.py
├── tests/
│   └── test_handler.py  # Unit tests for Lambda function
├── main.ts              # CDKTF infrastructure (TypeScript)
├── .env.example         # Template for required environment variables
├── requirements.txt     # (If additional Lambda Python packages needed)
├── package.json         # Node/CDKTF dependencies
└── ...
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Adityapokkunuri/aws-cost-bot.git
cd aws-cost-bot
```

### 2. Python Environment

Create and activate your Python virtual environment:

```bash
python -m venv ../venv
../venv/Scripts/Activate.ps1         # PowerShell (Windows)
# or
../venv/Scripts/activate             # Command Prompt (Windows)
```

Install test dependencies:

```bash
pip install pytest
# (and any extras from requirements.txt if present)
```

### 3. Node/CDKTF Dependencies

```bash
npm install
```

### 4. Environment Variables

Copy `.env.example` to `.env` and fill with real values:

```env
AWS_ACCESS_KEY_ID=changeme
AWS_SECRET_ACCESS_KEY=changeme
AWS_DEFAULT_REGION=us-east-1
SLACK_BOT_TOKEN=changeme
SLACK_CHANNEL_ID=changeme
```

---

## 🧪 Running Tests

Run all Python unit tests (locally, no AWS needed):

```bash
pytest
```

You should see 1 passing test that verifies Lambda output formatting.

---

## 📦 Packaging Lambda (for deployment)

After updating `handler.py`, zip it for AWS Lambda:

### PowerShell

```bash
Compress-Archive -Path lambda_module/handler.py -DestinationPath lambda.zip
```

### Bash

```bash
cd lambda_module
zip ../lambda.zip handler.py
```

---

## ☁️ Deployment (when ready; AWS credentials required)

Activate AWS credentials using `aws configure` or by exporting `.env` values.

Then deploy the infrastructure using CDKTF:

```bash
npx cdktf deploy
```

This provisions all AWS resources as defined in `main.ts`.

---

## 🔐 Security

- No real AWS, Slack, or secret keys are committed—sample `.env.example` only.
- Update `.env` locally; never commit `.env`!

---

## 📝 Notes for Client/Reviewers

- All logic and tests validated locally; AWS deployment pending credentials.
- Code is clean, modular, and ready for extension.
- Update `handler.py` with live AWS queries once provisioned.
- Update this README as your deployment process or requirements evolve.
- If you add CI/CD or other features, reflect changes here.
