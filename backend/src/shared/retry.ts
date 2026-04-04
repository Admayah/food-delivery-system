export const retry = async <T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000,
): Promise<T> => {
    try {
        return await fn();
    } catch (error: any) {
        if (retries === 0) throw error;

        if(error.code !== 'P1011') throw error;

        await new Promise((resolve) => setTimeout(resolve, delay));
        return retry(fn, retries - 1, delay * 2);
    }
}