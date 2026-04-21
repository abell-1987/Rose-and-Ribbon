import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { Authorized } from "./Authorized";
import { PartyPicker } from "./PartyPicker";

import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Menu } from "../components/auth/menu/Menu";
import { ViewPartyDetails } from "../components/auth/ViewPartyDetails";
import { Testimonials } from "../components/auth/Testimonials";

// Menu category pages (public)
import { HouseTeas } from "../components/auth/menu/HouseTeas/HouseTeas";
import { Cocktails } from "../components/auth/menu/Cocktails/Cocktails";
import { ItalianSodas } from "../components/auth/menu/ItalianSodas/ItalianSodas";
import { SweetPastries } from "../components/auth/menu/SweetPastries/SweetPastries";
import { SavoryPastries } from "../components/auth/menu/SavoryPastries/SavoryPastries";
import { Tarts } from "../components/auth/menu/Tarts/Tarts";
import { TeaSandwiches } from "../components/auth/menu/TeaSandwiches/TeaSandwiches";
import { Salads } from "../components/auth/menu/Salads/Salads";

// Holiday pages (public)
import { NYE } from "../components/auth/Holidays/NYE";
import { Galentines } from "../components/auth/Holidays/Galentines";
import { Pride } from "../components/auth/Holidays/Pride";
import { Christmas } from "../components/auth/Holidays/Christmas";
import { Halloween } from "../components/auth/Holidays/Halloween";
import { JaneBday } from "../components/auth/Holidays/JaneBday";

export const ApplicationViews = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />

            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/house-teas" element={<HouseTeas />} />
            <Route path="/menu/cocktails" element={<Cocktails />} />
            <Route path="/menu/italian-sodas" element={<ItalianSodas />} />
            <Route path="/menu/sweet-pastries" element={<SweetPastries />} />
            <Route path="/menu/savory-pastries" element={<SavoryPastries />} />
            <Route path="/menu/tarts" element={<Tarts />} />
            <Route path="/menu/tea-sandwiches" element={<TeaSandwiches />} />
            <Route path="/menu/salads" element={<Salads />} />

            <Route path="/testimonials" element={<Testimonials />} />

            {/* Holiday routes (public) */}
            <Route path="/holidays/nye" element={<NYE />} />
            <Route path="/holidays/galentines" element={<Galentines />} />
            <Route path="/holidays/pride" element={<Pride />} />
            <Route path="/holidays/christmas" element={<Christmas />} />
            <Route path="/holidays/halloween" element={<Halloween />} />
            <Route path="/holidays/jane-bday" element={<JaneBday />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
                path="/party-picker"
                element={
                    <Authorized>
                        <PartyPicker />
                    </Authorized>
                }
            />

            <Route
                path="/party/:partyId"
                element={
                    <Authorized>
                        <ViewPartyDetails />
                    </Authorized>
                }
            />

            {/* Fallback */}
            <Route path="*" element={<p style={{ padding: "2rem" }}>Not Found</p>} />
        </Routes>
    );
};