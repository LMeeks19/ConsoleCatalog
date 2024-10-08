using ConsoleCatalog.Internal_Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace ConsoleCatalog.Internal_Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CookieController : ControllerBase
    {
        private readonly ILogger<CookieController> _logger;
        private readonly DatabaseContext _databaseContext;

        public CookieController(ILogger<CookieController> logger, DatabaseContext databaseContext)
        {
            _logger = logger;
            _databaseContext = databaseContext;
        }

        [HttpGet(Name = "GetCookieByAuthId")]
        [Route("[action]/{authId}")]
        public Cookie? GetCookieByAuthId(string authId)
        {
            var cookie = _databaseContext.Cookies.SingleOrDefault(cookie => cookie.AuthId == new Guid(authId));

            if (cookie?.ExpiryDate < DateTime.Now) { 
                _databaseContext.Cookies.Remove(cookie);
                return null;
            }

            return cookie;
        }

        [HttpPost(Name = "PostCookie")]
        [Route("[action]")]
        public Cookie? PostCookie([FromBody] PostCookie postCookie)
        {
            DateTime expiryDate = DateTime.Now.AddDays(postCookie.Days);

            Cookie cookie = new() { 
                AuthId = Guid.NewGuid(),
                ExpiryDate = expiryDate,
                UserId = new Guid(postCookie.UserId),
            };
            _databaseContext.Cookies.Add(cookie);
            _databaseContext.SaveChanges();
            return cookie;
        }

        [HttpDelete(Name = "DeleteCookieByUserId")]
        [Route("[action]/{userId}")]
        public void DeleteCookieByUserId(string userId)
        {
            var cookie = _databaseContext.Cookies.SingleOrDefault(cookie => cookie.UserId == new Guid(userId));

            if (cookie != null)
            {
                _databaseContext.Cookies.Remove(cookie);
                _databaseContext.SaveChanges();
            }
        }

        [HttpDelete(Name = "DeleteCookieByAuthId")]
        [Route("[action]/{authId}")]
        public void DeleteCookieByAuthId(string authId)
        {
            var cookie = _databaseContext.Cookies.SingleOrDefault(cookie => cookie.AuthId == new Guid(authId));

            if (cookie != null)
            {
                _databaseContext.Cookies.Remove(cookie);
                _databaseContext.SaveChanges();
            }
        }
    }
    public class PostCookie
    {
        public string UserId { get; set; }
        public int Days { get; set; }
    }
}
