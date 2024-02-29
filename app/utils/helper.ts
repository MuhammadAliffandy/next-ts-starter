import moment from "moment";


export const formattedDate = (date: string ): string => {
    const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
    return formattedDate;
}
