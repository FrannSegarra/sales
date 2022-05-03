import { useCallback, useState } from 'react';
import { forkJoin, Observable, delay, finalize } from 'rxjs';

const useNationalSystem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const validateClient = useCallback((client) => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    // Fake validation with the external system.
    const validateClientData = new Observable((observer) => {
      let randomNumber = Math.floor(Math.random()*101);

      if (randomNumber > 30) {
        observer.next(true);
      } else {
        observer.error(new Error(`The client doesn't match with any record in the national registry identification system.`));
      }

      observer.complete();
    }).pipe(delay(5000));

    // Fake validation with the external system.
    const validateJudicialRecords = new Observable((observer) => {
      let randomNumber = Math.floor(Math.random()*101);

      if (randomNumber > 30) {
        observer.next(true);
      } else {
        observer.error(new Error(`The client has judicial records in the national system.`));
      }

      observer.complete();
    }).pipe(delay(5000));

    forkJoin({
      clientData: validateClientData,
      judicialRecords: validateJudicialRecords,
    }).pipe(
        finalize(() => {
          setIsLoading(false);
        })
      ).subscribe(
      (response) => {
        setResponse(response);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);


  return {
    isLoading,
    error,
    response,
    validateClient
  }
}

export default useNationalSystem;