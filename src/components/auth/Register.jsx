import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getOccasions } from "../../services/occasionService";
import {
  createParty,
  createTeaPartyMenuItem,
  createUser,
  getLoggedInUserId,
  getPartiesByUserId,
  getUsersByEmail,
  patchUser,
} from "../../services/userService";
import { getMenuItemsByCategory } from "../../services/menuService";
import "./Register.css";

const BASE_PRICE = 1000;

const normalizeIds = (arr) => arr.map((v) => Number(v || 0));
const uniqNonZero = (arr) => [...new Set(arr.filter((x) => x && x !== 0))];

const sumSelectedPrices = (selectedIds, items) => {
  const set = new Set(selectedIds.filter((id) => id && id !== 0));
  let total = 0;
  for (const id of set) {
    const found = items.find((x) => Number(x.id) === Number(id));
    if (found) total += Number(found.price || 0);
  }
  return total;
};

const buildSelect = (label, options, value, onChange, disabledIds = []) => {
  return (
    <label className="selectRow">
      <span className="selectLabel">{label}</span>
      <select value={value} onChange={onChange}>
        <option value={0}>None</option>
        {options.map((o) => (
          <option
            key={o.id}
            value={o.id}
            disabled={disabledIds.includes(Number(o.id))}
          >
            {o.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export const Register = () => {
  const navigate = useNavigate();

  const [houseTeas, setHouseTeas] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [italianSodas, setItalianSodas] = useState([]);
  const [sweetPastries, setSweetPastries] = useState([]);
  const [savoryPastries, setSavoryPastries] = useState([]);
  const [tarts, setTarts] = useState([]);
  const [teaSandwiches, setTeaSandwiches] = useState([]);
  const [salads, setSalads] = useState([]);
  const [occasions, setOccasions] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [partyDate, setPartyDate] = useState("");
  const [occasionId, setOccasionId] = useState(0);

  const [tea1, setTea1] = useState(0);
  const [tea2, setTea2] = useState(0);
  const [tea3, setTea3] = useState(0);
  const [tea4, setTea4] = useState(0);

  const [cocktail1, setCocktail1] = useState(0);
  const [cocktail2, setCocktail2] = useState(0);

  const [soda1, setSoda1] = useState(0);
  const [soda2, setSoda2] = useState(0);

  const [sweet1, setSweet1] = useState(0);
  const [sweet2, setSweet2] = useState(0);

  const [savory1, setSavory1] = useState(0);
  const [savory2, setSavory2] = useState(0);

  const [tart1, setTart1] = useState(0);
  const [tart2, setTart2] = useState(0);

  const [sand1, setSand1] = useState(0);
  const [sand2, setSand2] = useState(0);

  const [salad1, setSalad1] = useState(0);
  const [salad2, setSalad2] = useState(0);

  useEffect(() => {
    Promise.all([
      getMenuItemsByCategory("House Teas"),
      getMenuItemsByCategory("Cocktails"),
      getMenuItemsByCategory("Italian Sodas"),
      getMenuItemsByCategory("Sweet Pastries"),
      getMenuItemsByCategory("Savory Pastries"),
      getMenuItemsByCategory("Tarts"),
      getMenuItemsByCategory("Tea Sandwiches"),
      getMenuItemsByCategory("Salads"),
      getOccasions(),
    ]).then(
      ([
        teas,
        c,
        sodas,
        sweet,
        savory,
        tartList,
        sandwiches,
        saladList,
        occ,
      ]) => {
        setHouseTeas(teas);
        setCocktails(c);
        setItalianSodas(sodas);
        setSweetPastries(sweet);
        setSavoryPastries(savory);
        setTarts(tartList);
        setTeaSandwiches(sandwiches);
        setSalads(saladList);
        setOccasions(occ);
      }
    );
  }, []);

  const selectedTeaIds = normalizeIds([tea1, tea2, tea3, tea4]).filter((x) => x);
  const selectedCocktailIds = normalizeIds([cocktail1, cocktail2]).filter((x) => x);
  const selectedSodaIds = normalizeIds([soda1, soda2]).filter((x) => x);
  const selectedSweetIds = normalizeIds([sweet1, sweet2]).filter((x) => x);
  const selectedSavoryIds = normalizeIds([savory1, savory2]).filter((x) => x);
  const selectedTartIds = normalizeIds([tart1, tart2]).filter((x) => x);
  const selectedSandIds = normalizeIds([sand1, sand2]).filter((x) => x);
  const selectedSaladIds = normalizeIds([salad1, salad2]).filter((x) => x);

  const totalPrice = useMemo(() => {
    let total = BASE_PRICE;
    total += sumSelectedPrices(selectedTeaIds, houseTeas);
    total += sumSelectedPrices(selectedCocktailIds, cocktails);
    total += sumSelectedPrices(selectedSodaIds, italianSodas);
    total += sumSelectedPrices(selectedSweetIds, sweetPastries);
    total += sumSelectedPrices(selectedSavoryIds, savoryPastries);
    total += sumSelectedPrices(selectedTartIds, tarts);
    total += sumSelectedPrices(selectedSandIds, teaSandwiches);
    total += sumSelectedPrices(selectedSaladIds, salads);
    return total;
  }, [
    houseTeas,
    cocktails,
    italianSodas,
    sweetPastries,
    savoryPastries,
    tarts,
    teaSandwiches,
    salads,
    tea1,
    tea2,
    tea3,
    tea4,
    cocktail1,
    cocktail2,
    soda1,
    soda2,
    sweet1,
    sweet2,
    savory1,
    savory2,
    tart1,
    tart2,
    sand1,
    sand2,
    salad1,
    salad2,
  ]);

  const handleBook = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      window.alert("Please enter your name, email, and phone number.");
      return;
    }
    if (!occasionId || Number(occasionId) === 0) {
      window.alert("Please choose an occasion.");
      return;
    }
    if (!partyDate) {
      window.alert("Please choose a date.");
      return;
    }

    const loggedInUserId = getLoggedInUserId();
    let userIdToUse = loggedInUserId;

    if (!userIdToUse) {
      const matches = await getUsersByEmail(email.trim());
      const existing = matches?.[0];

      if (existing) {
        userIdToUse = existing.id;
        await patchUser(existing.id, { name, phone, email: email.trim() });
      } else {
        const createdUser = await createUser({ name, email: email.trim(), phone });
        userIdToUse = createdUser.id;
      }
    } else {
      await patchUser(userIdToUse, { name, phone, email: email.trim() });
    }

    localStorage.setItem("roseribbon_user", JSON.stringify({ id: userIdToUse }));

    const createdParty = await createParty({
      userId: userIdToUse,
      occasionId: Number(occasionId),
      partyDate,
      totalPrice,
    });

    const chosenMenuItemIds = uniqNonZero([
      ...selectedTeaIds,
      ...selectedCocktailIds,
      ...selectedSodaIds,
      ...selectedSweetIds,
      ...selectedSavoryIds,
      ...selectedTartIds,
      ...selectedSandIds,
      ...selectedSaladIds,
    ]);

    await Promise.all(
      chosenMenuItemIds.map((menuItemId) =>
        createTeaPartyMenuItem({
          partyId: createdParty.id,
          menuItemId: Number(menuItemId),
        })
      )
    );

    window.dispatchEvent(new Event("rr:user-updated"));

    // ✅ FIXED: popup added correctly
    window.alert("Thank you for celebrating with us! We look forward to serving you.");

    const parties = await getPartiesByUserId(userIdToUse);
    if ((parties?.length ?? 0) > 1) {
      navigate("/party-picker");
    } else {
      navigate(`/party/${createdParty.id}`);
    }
  };

  return (
    <div className="bookPage">
      <h1 className="pageTitle">Book a party with us!</h1>
      <p className="subText">
        Give us your contact info and choose you menu items below. A base charge
        of $1000 is automatically applied, your menu choices determine the price
        from there. PayPal invoice will be sent to the provided email address.
      </p>

      <form className="bookForm" onSubmit={handleBook}>
        <div className="contactRow">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="menuGrid">
          <section className="regencyCard">
            <h2 className="cardHeading">House Teas</h2>
            {buildSelect(
              "Tea 1",
              houseTeas,
              tea1,
              (e) => setTea1(e.target.value),
              selectedTeaIds.filter((id) => id !== Number(tea1))
            )}
            {buildSelect(
              "Tea 2",
              houseTeas,
              tea2,
              (e) => setTea2(e.target.value),
              selectedTeaIds.filter((id) => id !== Number(tea2))
            )}
            {buildSelect(
              "Tea 3",
              houseTeas,
              tea3,
              (e) => setTea3(e.target.value),
              selectedTeaIds.filter((id) => id !== Number(tea3))
            )}
            {buildSelect(
              "Tea 4",
              houseTeas,
              tea4,
              (e) => setTea4(e.target.value),
              selectedTeaIds.filter((id) => id !== Number(tea4))
            )}
          </section>

          <section className="regencyCard">
            <h2 className="cardHeading">Cocktails</h2>
            {buildSelect(
              "Cocktail 1",
              cocktails,
              cocktail1,
              (e) => setCocktail1(e.target.value),
              selectedCocktailIds.filter((id) => id !== Number(cocktail1))
            )}
            {buildSelect(
              "Cocktail 2",
              cocktails,
              cocktail2,
              (e) => setCocktail2(e.target.value),
              selectedCocktailIds.filter((id) => id !== Number(cocktail2))
            )}
          </section>

          <section className="regencyCard">
            <h2 className="cardHeading">Italian Sodas</h2>
            {buildSelect(
              "Soda 1",
              italianSodas,
              soda1,
              (e) => setSoda1(e.target.value),
              selectedSodaIds.filter((id) => id !== Number(soda1))
            )}
            {buildSelect(
              "Soda 2",
              italianSodas,
              soda2,
              (e) => setSoda2(e.target.value),
              selectedSodaIds.filter((id) => id !== Number(soda2))
            )}
          </section>

          <section className="regencyCard">
            <h2 className="cardHeading">Sweet Pastries</h2>
            {buildSelect(
              "Sweet 1",
              sweetPastries,
              sweet1,
              (e) => setSweet1(e.target.value),
              selectedSweetIds.filter((id) => id !== Number(sweet1))
            )}
            {buildSelect(
              "Sweet 2",
              sweetPastries,
              sweet2,
              (e) => setSweet2(e.target.value),
              selectedSweetIds.filter((id) => id !== Number(sweet2))
            )}
          </section>

          <section className="regencyCard">
            <h2 className="cardHeading">Savory Pastries</h2>
            {buildSelect(
              "Savory 1",
              savoryPastries,
              savory1,
              (e) => setSavory1(e.target.value),
              selectedSavoryIds.filter((id) => id !== Number(savory1))
            )}
            {buildSelect(
              "Savory 2",
              savoryPastries,
              savory2,
              (e) => setSavory2(e.target.value),
              selectedSavoryIds.filter((id) => id !== Number(savory2))
            )}
          </section>

          <section className="regencyCard">
            <h2 className="cardHeading">Tarts</h2>
            {buildSelect(
              "Tart 1",
              tarts,
              tart1,
              (e) => setTart1(e.target.value),
              selectedTartIds.filter((id) => id !== Number(tart1))
            )}
            {buildSelect(
              "Tart 2",
              tarts,
              tart2,
              (e) => setTart2(e.target.value),
              selectedTartIds.filter((id) => id !== Number(tart2))
            )}
          </section>

          <section className="regencyCard">
            <h2 className="cardHeading">Tea Sandwiches</h2>
            {buildSelect(
              "Sandwich 1",
              teaSandwiches,
              sand1,
              (e) => setSand1(e.target.value),
              selectedSandIds.filter((id) => id !== Number(sand1))
            )}
            {buildSelect(
              "Sandwich 2",
              teaSandwiches,
              sand2,
              (e) => setSand2(e.target.value),
              selectedSandIds.filter((id) => id !== Number(sand2))
            )}
          </section>

          <section className="regencyCard">
            <h2 className="cardHeading">Salads</h2>
            {buildSelect(
              "Salad 1",
              salads,
              salad1,
              (e) => setSalad1(e.target.value),
              selectedSaladIds.filter((id) => id !== Number(salad1))
            )}
            {buildSelect(
              "Salad 2",
              salads,
              salad2,
              (e) => setSalad2(e.target.value),
              selectedSaladIds.filter((id) => id !== Number(salad2))
            )}
          </section>
        </div>

        <div className="bottomRow">
          <div className="bottomBlock">
            <h2>Occasion:</h2>
            <select
              value={occasionId}
              onChange={(e) => setOccasionId(e.target.value)}
            >
              <option value={0}>Select an occasion</option>
              {occasions.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>

            <h2>Choose your date:</h2>
            <input
              type="date"
              value={partyDate}
              onChange={(e) => setPartyDate(e.target.value)}
            />
          </div>

          <div className="bottomBlock totalBlock">
            <h2>Total Price:</h2>
            <div className="totalPrice">${totalPrice}</div>
          </div>
        </div>

        <button className="bookBtn" type="submit">
          Book!
        </button>
      </form>
    </div>
  );
};
