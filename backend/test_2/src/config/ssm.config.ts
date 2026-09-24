import {
    SSMClient,
    GetParametersByPathCommand,
    GetParametersByPathCommandInput,
} from "@aws-sdk/client-ssm";

const ssm = new SSMClient({ region: "us-east-1" });

export async function getAppEnvParameters(
    env: string,
    appName: string
): Promise<Record<string, string>> {
    const prefix = `/${appName}/${env}/`;
    const params: Record<string, string> = {};
    let nextToken: string | undefined;

    do {
        const input: GetParametersByPathCommandInput = {
            Path: prefix,
            WithDecryption: true,
            NextToken: nextToken,
        };

        const command = new GetParametersByPathCommand(input);
        const response = await ssm.send(command);

        response.Parameters?.forEach((param) => {
            if (param.Name && param.Value) {
                const nameParts = param.Name.split("/");
                const key = nameParts[nameParts.length - 1];
                if (key) {
                    params[key] = param.Value;
                }
            }
        });

        nextToken = response.NextToken;
    } while (nextToken);

    return params;
}
