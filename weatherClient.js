async function fetchWeather(latitude, longitude, {apiKey, signal, fetchImpl = fetch} = {}) {
    if (!apiKey) throw new Error("Set EXPO_PUBLIC_OPENWEATHER_API_KEY in your .env file, then restart the app.");
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        throw new Error("Unable to determine your location.");
    }
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (signal?.aborted) abort();
    signal?.addEventListener("abort", abort);
    const timeout = setTimeout(abort, 15000);
    try {
        const response = await fetchImpl(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${encodeURIComponent(apiKey)}&units=metric`,
            {signal: controller.signal}
        );
        if (!response.ok) throw new Error(`Weather service returned ${response.status}. Check your API key and try again.`);
        const data = await response.json();
        if (!Number.isFinite(data?.main?.temp) || typeof data?.weather?.[0]?.main !== "string" || !data.weather[0].main) {
            throw new Error("The weather service returned incomplete data. Please try again.");
        }
        return {temp: data.main.temp, condition: data.weather[0].main};
    } catch (error) {
        if (error.name === "AbortError") throw new Error("The weather request was cancelled or timed out. Please try again.");
        throw error;
    } finally {
        clearTimeout(timeout);
        signal?.removeEventListener("abort", abort);
    }
}

module.exports = {fetchWeather};
