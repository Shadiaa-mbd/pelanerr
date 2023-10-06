public record AccountDto(
    [MinLength(3), MaxLength(20)] string Name,
    [MaxLength(50), RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,5})+)$", ErrorMessage ="Bad Email Format.")] string Email,
    [DataType(DataType.Password), MinLength(8), MaxLength(25)] string Password
);