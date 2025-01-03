import { Fragment } from "react/jsx-runtime";
import { AppRoutes } from "./routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function CalendarApp(): JSX.Element {
    return (
        <Fragment>
            <Provider store={store}>
                <AppRoutes />
            </Provider>
        </Fragment>
    )
}
