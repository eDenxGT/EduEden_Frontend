/* eslint-disable react/prop-types */
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
	label,
	type = "text",
	placeholder,
	value,
	onChange,
	showPassword,
	setShowPassword,
	name,
	icon,
   className,
	defaultValue,
	labelAndInputClassName
}) => {
	return (
		<div className={`mt-3 ${labelAndInputClassName}`}>
			<label className="block text-xs font-medium text-gray-700 mb-1">
				{label}
			</label>
			<div className="relative">
				<input
					type={
						showPassword !== undefined
							? showPassword
								? "text"
								: "password"
							: type
					}
					placeholder={placeholder}
					value={value}
					defaultValue={defaultValue}
					onChange={onChange}
					name={name}
					className={`w-full px-3 pl-8 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722] focus:border-transparent pr-10 transition-all duration-300 ease-in-out ${className} `}
				/>
				<span className="absolute left-2.5 top-1/2 text-gray-400 -translate-y-1/2">
					{icon && <div>{icon}</div>}
				</span>
				{showPassword !== undefined && (
					<button
						type="button"
						onClick={setShowPassword}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
						{showPassword ? (
							<EyeOff size={18} />
						) : (
							<Eye size={18} />
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default InputField;
