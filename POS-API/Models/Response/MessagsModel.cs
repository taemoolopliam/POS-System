namespace POS_API.Models
{
    public class MessagsModel
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public bool TaskStatus { get; set; } = false;
    }
    public class MessagsWithDataModel : MessagsModel
    {
        public object Data { get; set; }

    }

    public class MessagsPaginModel : MessagsModel
    {
        public object Data { get; set; }
        public object pagin { get; set; }

    }

    public class MessagsDataModel : MessagsModel
    {
        public object[] Data { get; set; }
    }

    public class MessagsFieldModel : MessagsModel
    {
        public FieldError[] FieldError { get; set; }
    }

    public class FieldError
    {
        public string FieldName { get; set; }
        public string Message { get; set; }
    }
}
