import { Route, Routes } from "react-router-dom"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/">
                <Route index element={<>Welcome</>} />
            </Route>
        </Routes >
    )
}
