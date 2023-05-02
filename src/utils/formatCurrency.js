const formattedAmount = (amount) => {
    const formattedAmount = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(amount);

    if (isNaN(formattedAmount)) {
        return "N/A";
    }

    return formattedAmount;
};

export default formattedAmount;
