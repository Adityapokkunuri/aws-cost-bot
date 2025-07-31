import sys
import os

# Add the project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from lambda_module.handler import lambda_handler  # ✅ updated import

def test_lambda_handler_table_format():
    event = {}       # mock AWS Lambda event
    context = {}     # mock Lambda context

    result = lambda_handler(event, context)

    # ✅ Assertions
    assert result['statusCode'] == 200
    assert "| Service | Cost (USD) |" in result['body']
    assert "| EC2 | 17.45 |" in result['body']
