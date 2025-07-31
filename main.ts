import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { provider } from '@cdktf/provider-aws';
import * as iamRole from '@cdktf/provider-aws/lib/iam-role';
import * as lambdaFunction from '@cdktf/provider-aws/lib/lambda-function';
import * as iamRolePolicyAttachment from '@cdktf/provider-aws/lib/iam-role-policy-attachment';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new provider.AwsProvider(this, 'aws', {
      region: 'us-east-1',
    });

    // IAM Role
    const lambdaExecRole = new iamRole.IamRole(this, 'LambdaExecRole', {
      name: 'aws-cost-bot-lambda-role',
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { Service: 'lambda.amazonaws.com' },
            Action: 'sts:AssumeRole'
          }
        ]
      })
    });

    // Attach AWSLambdaBasicExecutionRole
    new iamRolePolicyAttachment.IamRolePolicyAttachment(this, 'LambdaBasicExecAttach', {
      role: lambdaExecRole.name,
      policyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'
    });

    new lambdaFunction.LambdaFunction(this, 'CostBotLambda', {
      functionName: 'aws-cost-bot-function',
      filename: 'lambda.zip', // must be present at deploy time
      handler: 'handler.lambda_handler',
      runtime: 'python3.11',
      role: lambdaExecRole.arn
    });
  }
}

const app = new App();
new MyStack(app, 'aws-cost-bot');
app.synth();
