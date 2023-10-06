namespace api.Models;

public record User(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string Name,
    string Email,
    string Password
);