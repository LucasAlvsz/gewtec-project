class AppError {
	public readonly code: number
	public readonly message: string

	constructor(code: number, message: string) {
		this.code = code
		this.message = message
	}
}

class UnprocessableEntityError extends AppError {
	constructor(message: string) {
		super(422, message)
	}
}

class ConflictError extends AppError {
	constructor(message: string) {
		super(409, message)
	}
}

export { AppError, UnprocessableEntityError, ConflictError }
