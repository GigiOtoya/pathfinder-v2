interface SliderProps {
  min: number;
  max: number;
  step: number;
  labelStart?: string;
  labelEnd?: string;
  value: number;
  update: (val: number) => void;
}

export const Slider = (props: SliderProps) => {
  const { min, max, step } = props;
  const { labelStart = "start", labelEnd = "end" } = props;
  const { value, update } = props;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.currentTarget.value);
    update(newValue);
  };

  return (
    <div className="slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleOnChange}
      ></input>
      <div className="slider-labels">
        <span className="label">{labelStart}</span>
        <span className="label">{labelEnd}</span>
      </div>
    </div>
  );
};
