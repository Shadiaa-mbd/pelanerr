namespace api.Models;

public record TaskUser(
    [property: BsonId, BsonRepresentation(BsonType.ObjectId)] string? Id,
    string Title,
    string? Category,
    DateTime? Date
);
