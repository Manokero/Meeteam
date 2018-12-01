using System;
namespace MeeteamAPI.Classes
{
    public class TransactionResult
    {
        public int Code { get; set; }
        public string Message { get; set; }
        public string Redirect { get; set; }
        public object Data { get; set; }

        public const int SUCCESS = 200;
        public const int CREATED = 201;
        public const int ACCEPTED = 202;
        public const int NO_CONTENT = 204;
        public const int UNAUTHORIZED = 401;
        public const int FORBIDDEN = 403;
        public const int NOT_FOUND = 404;
        public const int METHOD_NOT_ALLOWED = 405;
        public const int NOT_ACEPTABLE = 406;
        public const int GONE = 410;



        public TransactionResult() {

        }
        /// <summary>
        /// Initializes a new instance of the <see cref="T:HesserCore.Classes.TransactionResult"/> class.
        /// </summary>
        /// <param name="Code">Code.</param>
        /// <param name="Message">Message.</param>
        public TransactionResult(int Code, string Message)
        {
            this.Code = Code;
            this.Message = Message;
        }
    }
}
