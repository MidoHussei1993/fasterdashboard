export class FaqsFilter {
    constructor() {
        this.CreateAtFrom = null;
        this.CreateAtTo = null;
        this.Answers = null;
        this.AnswersAr = null;
        this.Question = null;
        this.QuestionAr = null;
        this.IsActive = null;
    }
    PageNumber: number;
    PageSize: number;
    IsActive: boolean;
    CreateAtFrom: Date;
    CreateAtTo: Date;
    Answers: string;
    AnswersAr: string;
    Question: string;
    QuestionAr: string;
}
