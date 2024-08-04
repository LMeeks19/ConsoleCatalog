using ConsoleCatalog.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ConsoleCatalog.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {

        private readonly ILogger<UserController> _logger;
        private readonly DatabaseContext _databaseContext;
        private readonly IJSRuntime _jsRuntime;

        public UserController(ILogger<UserController> logger, DatabaseContext databaseContext, IJSRuntime jsRuntime)
        {
            _logger = logger;
            _databaseContext = databaseContext;
            _jsRuntime = jsRuntime;
        }

        [HttpGet(Name = "GetUser")]
        [Route("{username}")]
        public User Get(string username)
        {
            var user = _databaseContext.Users.SingleOrDefault(user => user.Username == username);

            if (user == null)
            {
                return new User() { Username = null, Password = null };
            }

            return user;
        }

        [HttpPost(Name = "PostUser")]
        public User Post ([FromBody] RegisterDetails registerDetails)
        {
            var user = _databaseContext.Users.SingleOrDefault(user => user.Username == registerDetails.Username);

            if (user != null)
            {
                throw new Exception();
            }

            var newUser = new User 
            { 
                Username = registerDetails.Username,
                PlaystationGamertag = registerDetails.PlaystationGamertag, 
                XboxGamertag = registerDetails.XboxGamertag, 
                Password = registerDetails.Password 
            };

            _databaseContext.Users.Add(newUser);

            _databaseContext.SaveChanges();

            user = _databaseContext.Users.Single(user => user.Username == registerDetails.Username);

            return user;
        }
    }
}
