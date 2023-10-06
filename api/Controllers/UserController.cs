namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IMongoCollection<User>? _collection;
    const string _collectionName = "user";

   public UserController(IMongoClient client, IMongoDbSettings dbSettings, IUserRepository userRepository)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<User>(_collectionName);
        _userRepository = userRepository;
    }


    [HttpPost("register")]
    public async Task<ActionResult<UserDto>?> Create(AccountDto userInput, CancellationToken cancellationToken)
    {
        UserDto? userDto = await _userRepository.Create(userInput, cancellationToken);
        
        if (userDto is null)
            return null;

        return userDto;
    }

    [HttpGet("login/{email}/{password}")]
    public async Task<ActionResult<User>?> Login(string email, string password,CancellationToken cancellationToken)
    {
        User user = await _collection.Find<User>(user => user.Email == email.ToLower() .Trim() && user.Password == password.Trim()).FirstOrDefaultAsync(cancellationToken);

        if (user is null)
            return null;
        
        return user;
    }
}
