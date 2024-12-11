"use client";
import { useState, ChangeEvent, DragEvent, useRef } from "react";
import { PiUploadSimpleThin } from "react-icons/pi";
import Image from "next/image";

type Props = {
    onChange: (value: File | null) => void
    value?: File | null
    defaultImage?: string
};

export default function ImageUploader({ onChange, value, defaultImage }: Props) {
    const [image, setImage] = useState<File | null>(value || null)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const MAX_SIZE_MB = 1

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = Array.from(e.target.files)[0];
            const validFile = validateFile(file);

            if (validFile) {
                setImage(file)
                onChange(file)
            }
        }
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.dataTransfer.files) {
            const file = Array.from(e.dataTransfer.files)[0]
            const validFile = validateFile(file)

            if (validFile) {
                setImage(file)
                onChange(file)
            }
        }
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleClick = () => {
        inputRef.current?.click()
    }

    const validateFile = (file: File): boolean => {
        setError(null)

        if (file.size <= MAX_SIZE_MB * 1024 * 1024) return true;

        setError(`El archivo ${file.name} supera el límite de 1MB`)
        return false
    }

    return (
        <div
            className="z-10 h-96 relative flex-center border rounded border-ring"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="hidden"
                id="image-upload"
                ref={inputRef}
            />

            {error && <p className="absolute top-2 text-red-500 text-sm">{error}</p>}

            {image ? (
                <div
                    className="group relative w-60 h-60 flex-center cursor-pointer rounded group border-dashed border border-foreground m-auto duration-200 hover:bg-secondary dark:hover:bg-black"
                    onClick={handleClick}
                >
                    <Image
                        src={URL.createObjectURL(image)}
                        alt={image.name}
                        className="object-cover w-60 h-60 rounded"
                        height={240}
                        width={240}
                        draggable="false"
                    />
                    <div className="absolute inset-0 bg-black/50 w-full h-full flex-center opacity-0 group-hover:opacity-100 duration-200">
                        <PiUploadSimpleThin
                            size={40}
                            className="group-hover:text-primary text-shadow-lg duration-200"
                        />
                    </div>
                </div>
            ) : (
                <div
                    className="w-[300px] h-[300px] flex-center cursor-pointer rounded group border-dashed border border-foreground m-auto duration-200 hover:bg-secondary dark:hover:bg-black"
                    onClick={handleClick}
                >
                    {defaultImage && defaultImage != "PENDIENTE" ? (
                        <div
                            className="group relative w-60 h-60 flex-center cursor-pointer rounded group border-dashed border border-foreground m-auto duration-200 hover:bg-secondary dark:hover:bg-black"
                            onClick={handleClick}
                        >
                            <Image
                                src={defaultImage}
                                alt={"default image"}
                                className="object-cover w-60 h-60 rounded"
                                height={240}
                                width={240}
                                draggable="false"
                            />
                            <div className="absolute inset-0 bg-black/50 w-full h-full flex-center opacity-0 group-hover:opacity-100 duration-200">
                                <PiUploadSimpleThin
                                    size={40}
                                    className="group-hover:text-primary text-shadow-lg duration-200"
                                />
                            </div>
                        </div>

                    ) : (
                        <PiUploadSimpleThin
                            size={40}
                            className="group-hover:text-primary text-shadow-lg duration-200"
                        />
                    )}
                </div>
            )}
        </div>
    )
}