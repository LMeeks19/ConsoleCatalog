namespace ConsoleCatalog.Internal_Server.Models
{
    public class Cookie
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public Guid AuthId { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
