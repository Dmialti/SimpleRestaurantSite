import styles from "./ScheduleListElement.module.css";

interface ScheduleListElementProps {
  day: string;
  hours: string;
}

export default function ScheduleListElement({
  day,
  hours,
}: ScheduleListElementProps) {
  return (
    <li className="flex flex-row gap-4 justify-between">
      <div>{day}</div>
      <div
        className={`w-full border-border-default border-dotted border-b-2 mb-1.5 ${styles.scheduleDecor}`}
      ></div>
      <div>{hours}</div>
    </li>
  );
}
