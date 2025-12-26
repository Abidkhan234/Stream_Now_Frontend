import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(duration);

const parseDate = (d) => {
    if (d == null) return null;

    if (typeof d === "number") {
        return String(d).length === 10 ? dayjs.unix(d) : dayjs(d);
    }

    if (typeof d === "string") {
        // treat plain "YYYY-MM-DD HH:mm:ss" as UTC-safe ISO
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(d)) {
            return dayjs.utc(d.replace(" ", "T"));
        }

        if (/^\d{10}$/.test(d)) return dayjs.unix(Number(d));
        if (/^\d{13}$/.test(d)) return dayjs(Number(d));

        return dayjs(d);
    }

    return dayjs(d);
};

export const formatDuration = (time) => {
    if (!time) return "0m";

    const totalMinutes = Math.floor(dayjs.duration(Number(time)).asMinutes());
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
        return `${hours}hr ${minutes} m`;
    }

    return `${minutes}m`;
}

const formatDateRange = (a, b) => {
    let start, end;
    if (Array.isArray(a)) {
        [start, end] = a;
    } else {
        start = a;
        end = b;
    }

    const s = parseDate(start);
    const e = parseDate(end ?? start);

    if (!s || !s.isValid()) return "";
    if (!e || !e.isValid()) return s.format("D MMMM, YYYY");

    if (s.isSame(e, "day")) return s.format("D MMMM, YYYY");

    return e.format("D MMMM, YYYY");
};

export default formatDateRange;
