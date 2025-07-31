# lambda/handler.py

def lambda_handler(event, context):
    # Sample/mock AWS cost data for development
    fake_data = [
        {'Service': 'EC2', 'Cost': 17.45},
        {'Service': 'S3', 'Cost': 4.83},
        {'Service': 'Lambda', 'Cost': 0.12}
    ]
    # Format as Markdown table for Slack
    markdown_table = "| Service | Cost (USD) |\n|---------|------------|\n"
    for row in fake_data:
        markdown_table += f"| {row['Service']} | {row['Cost']} |\n"
    return {
        'statusCode': 200,
        'body': markdown_table
    }
# This function simulates fetching AWS cost data and formats it as a Markdown table.
# In a real scenario, you would replace the fake_data with actual AWS Cost Explorer API calls.