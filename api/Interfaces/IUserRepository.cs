namespace api.interfaces;

public interface IUserRepository
{ 
    public Task<UserDto?> Create(AccountDto pass, CancellationToken cancellationToken);
}