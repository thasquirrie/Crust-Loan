const formattedAmount = (amount) => {
    const formattedAmount = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    }).format(amount);

    return formattedAmount;
};

export default formattedAmount;
