import React {useEffect, useStatuse} from "react";
import "../CSS/FinancialInfoPage.css";

const FinancialInfoPage = () => 
	{
		const [data, setData] = useState(null);

		useEffect(() =>
		{
			fetch("https://localhost5000/api/financial")
				.then((res) => res.json())
				.then((json) => setData(json))
				.catch((err) => console.error("Error fetching data:", err));
		}
		[]);

		if (!data) return <p>Loading financial info...</p>;

		return (
			<div className = "financial-container">
				<h1>FinancialInformation</h>

