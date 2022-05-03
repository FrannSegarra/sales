import { useCallback, useState } from 'react';
import { Observable, delay, finalize } from 'rxjs';

const useQualificationSystem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const validateScore = useCallback((validatedData) => {
    setIsLoading(true);
    setResponse(null);

    // Fake validation with the internal system.
    const internalValidation = new Observable((observer) => {
      let score = Math.floor(Math.random()*101);
      observer.next(score);
      observer.complete();
    }).pipe(delay(3000));


    internalValidation.pipe(
        finalize(() => {
          setIsLoading(false);
        })
      ).subscribe(
      (response) => {
        setResponse(response);
      }
    );
  }, []);


  return {
    isLoading,
    response,
    validateScore
  }
}

export default useQualificationSystem;