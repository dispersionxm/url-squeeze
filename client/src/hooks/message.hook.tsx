import { useCallback } from 'react'

export const useMessage = () => {
	return useCallback((text: string | null) => {

// @ts-ignore
		if (window.M && text) {

			// @ts-ignore
			window.M.toast({ html: text })
		}
	}, [])
}