type InputFieldProps = {
    value: string
    onChange: (value: string) => void
    maxLength: number
  }
  
  export default function InputField({ value, onChange, maxLength }: InputFieldProps) {
    return (
      <input
        type="text"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="w-full p-2 rounded-md bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Type the word here..."
      />
    )
  }
  
  