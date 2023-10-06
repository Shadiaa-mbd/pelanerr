[ApiController]
[Route("api/[controller]")]
public class TaskController : ControllerBase
{
    private readonly IMongoCollection<TaskUser> _collection;

    public TaskController(IMongoClient client, IMongoDbSettings dbSettings)
    {
        var dbName = client.GetDatabase(dbSettings.DatabaseName);
        _collection = dbName.GetCollection<TaskUser>("task");
    }

    [HttpPost("add-task")]
    public ActionResult<TaskUser> Create(TaskUser userInput)
    {
        TaskUser task = new TaskUser(
            Id: null,
            Title: userInput.Title,
            Category: userInput?.Category,
            Date: userInput?.Date
        );

        _collection.InsertOne(task);

        return task;
    }

    [HttpGet("get-by-date/{date}")]
    public ActionResult<IEnumerable<TaskUser>>? Get(DateTime date)
    {
        List<TaskUser> tasks = _collection.Find<TaskUser>(tasks => tasks.Date  == date).ToList<TaskUser>();

        if (!tasks.Any())
            return NoContent();
        
        return tasks;
    }

    [HttpGet("get-all")] 
    public ActionResult<IEnumerable<TaskUser>> GetAll()
    {
        List<TaskUser> tasks =_collection.Find<TaskUser>(new BsonDocument()).ToList();

        if (!tasks.Any())
            return NoContent();
        
        return tasks;
    }

    [HttpDelete("delete-task/{taskId}")]
    public ActionResult<DeleteResult> Delete(string taskId)
    {
        return _collection.DeleteOne<TaskUser>(doc => doc.Id == taskId);
    }
}
