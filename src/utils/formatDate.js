import moment from "moment";

const formattedTime = (time, format) => {
    const convertedTime = moment(time).format(format);
    return convertedTime;
};

export default formattedTime;
