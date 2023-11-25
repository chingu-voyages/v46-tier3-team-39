export type SubmissionsData<T> = {
  submittedData: {
    map: {
      //mapped to question ids but stored as key-data store (useful for rendering individual submissions)
      [key: string]: {
        //mapped to submission ids
        [key: string]: Partial<T> & {
          questionId?: string;
          quizId?: string;
          id: string;
        };
      };
    };
    arr: {
      //mapped to question ids, but stored as an array (useful for rendering lists)
      [key: string]: (Partial<T> & {
        questionId?: string;
        quizId?: string;
        id: string;
      })[];
    };
  };
  ongoingData: {
    //mapped to submission ids
    [key: string]: Partial<T> & {
      questionId?: string;
      quizId?: string;
      id?: string;
    };
  };
};
export type SubmissionsDataAnyParentItem<T> = {
  submittedData: {
    map: {
      [key: string]: Partial<T> & { id: string };
    };
    arr: (Partial<T> & { id: string })[];
  };
  ongoingData: {
    map: {
      [key: string]: Partial<T> & { id: string };
    };
    arr: (Partial<T> & { id: string })[];
  };
};
