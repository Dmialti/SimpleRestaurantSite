import ScheduleListElement from "./components/ScheduleListElement/ScheduleListElement";
import styles from "./ScheduleList.module.css";

export type ScheduleValues = {
  day: string;
  hours: string;
}[];

interface ScheduleProps {
  scheduleValues?: ScheduleValues;
  addToRefs: (el: HTMLElement | null) => void;
}

export default function ScheduleList({
  scheduleValues,
  addToRefs,
}: ScheduleProps) {
  return (
    <ul
      ref={addToRefs}
      className={`text-nowrap flex flex-col gap-4 text-[24px] leading-[200%] tracking-[0px] font-forum ${styles.scheduleList} invisible`}
    >
      {scheduleValues?.map((pair, index) => (
        <ScheduleListElement key={index} day={pair.day} hours={pair.hours} />
      ))}
    </ul>
  );
}
