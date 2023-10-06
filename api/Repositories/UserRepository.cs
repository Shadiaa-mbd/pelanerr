namespace api.Repositories;

public class UserRepository : IUserRepository
{
    private const string _collectionName ="user";
    private readonly IMongoCollection<User>? _collection;

    public UserRepository(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var database = client.GetDatabase(dbSettings.DatabaseName);
        _collection = database.GetCollection<User>(_collectionName);
    }

    public async Task<UserDto?> Create(AccountDto userInput, CancellationToken cancellationToken)
    {
        bool doesExist = await _collection.Find<User>(user => user.Email ==
        userInput.Email.ToLower().Trim()).AnyAsync(cancellationToken);

        if (doesExist)
            return null;
        
        User user = new User(
            Id:null,
            Name: userInput.Name,
            Email: userInput.Email.ToLower().Trim(),
            Password: userInput.Password
        );

        if (_collection is not null)
            await _collection.InsertOneAsync(user, null, cancellationToken);

        if (user.Id is not null)
        {
            UserDto userDto = new UserDto(
                Id: user.Id,
                Email: user.Email
            );

            return userDto;
        }

        return null;
    }   
}