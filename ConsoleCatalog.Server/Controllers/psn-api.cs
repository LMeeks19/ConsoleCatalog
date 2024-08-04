using System;
using System.Collections.Specialized;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

public class AuthHelper
{
    private const string AuthBaseUrl = "https://ca.account.sony.com/api/authz/v3/oauth";
    private const string ClientId = "09515159-7237-4370-9b40-3806e67c0891";
    private const string RedirectUri = "com.scee.psxandroid.scecompcall://redirect";
    private const string Scope = "psn:mobile.v2.core psn:clientapp";

    public async Task<string> ExchangeNpssoForCodeAsync(string npssoToken)
    {
        var queryString = new NameValueCollection
        {
            {"access_type", "offline"},
            {"client_id", ClientId},
            {"redirect_uri", RedirectUri},
            {"response_type", "code"},
            {"scope", Scope}
        };

        var query = string.Join("&", queryString.AllKeys.Select(key => $"{key}={HttpUtility.UrlEncode(queryString[key])}"));

        var requestUrl = $"{AuthBaseUrl}?{query}";

        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Add("Cookie", $"npsso={npssoToken}");

        HttpResponseMessage response = new();

        try
        {
            response = await httpClient.GetAsync(requestUrl, HttpCompletionOption.ResponseHeadersRead);
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }


        if (response.StatusCode != System.Net.HttpStatusCode.Found)
        {
            throw new Exception("Invalid response status code");
        }

        var locationHeader = response.Headers.Location;
        if (locationHeader == null || !locationHeader.ToString().Contains("?code="))
        {
            throw new Exception("Invalid location header");
        }

        var redirectParams = HttpUtility.ParseQueryString(locationHeader.ToString().Split(new[] { "redirect/" }, StringSplitOptions.None)[1]);
        return redirectParams["code"];
     }
}