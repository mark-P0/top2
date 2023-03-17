import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.error(error);

  /**
   * - https://github.com/remix-run/react-router/discussions/9628
   * - https://reactrouter.com/en/main/utils/is-route-error-response
   */
  if (isRouteErrorResponse(error) || true) {
    return (
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.data?.message}</i>
        </p>
      </div>
    );
  }

  return <div>An error has occurred</div>;
}
