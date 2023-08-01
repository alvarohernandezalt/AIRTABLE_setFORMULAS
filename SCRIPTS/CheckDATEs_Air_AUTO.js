// Function to check if the date has changed in the last 5 minutes
function hasDateChanged(dateStr) {
  const dateField = new Date(dateStr);
  const now = new Date();
  const timeThreshold = 10 * 60 * 1000; // 10 minutes in milliseconds
  return now.getTime() - dateField.getTime() <= timeThreshold;
}

// Example usage in the main function for Airtable automation
async function main() {
  const { ESP_I_MOD, ESP_W_MOD, ENG_I_MOD, ENG_W_MOD, FRA_I_MOD, FRA_W_MOD, POR_I_MOD,
           POR_W_MOD, EUSK_I_MOD, EUSK_W_MOD } = input.config();

  // Check if the date fields have changed in the last 5 minutes
  const hasESP_I_MODChanged = hasDateChanged(ESP_I_MOD);
  const hasESP_W_MODChanged = hasDateChanged(ESP_W_MOD);
  const hasENG_I_MODChanged = hasDateChanged(ENG_I_MOD);
  const hasENG_W_MODChanged = hasDateChanged(ENG_W_MOD);
  const hasFRA_I_MODChanged = hasDateChanged(FRA_I_MOD);
  const hasFRA_W_MODChanged = hasDateChanged(FRA_W_MOD);
  const hasPOR_I_MODChanged = hasDateChanged(POR_I_MOD);
  const hasPOR_W_MODChanged = hasDateChanged(POR_W_MOD);
  const hasEUSK_I_MODChanged = hasDateChanged(EUSK_I_MOD);
  const hasEUSK_W_MODChanged = hasDateChanged(EUSK_W_MOD);
  // Check other date fields...

  // Do something based on the results
  output.set("ESP_I", hasESP_I_MODChanged);
  output.set("ESP_W", hasESP_W_MODChanged);
  output.set("ENG_I", hasENG_I_MODChanged);
  output.set("ENG_W", hasENG_W_MODChanged);
  output.set("FRA_I", hasFRA_I_MODChanged);
  output.set("FRA_W", hasFRA_W_MODChanged);
  output.set("POR_I", hasPOR_I_MODChanged);
  output.set("POR_W", hasPOR_W_MODChanged);
  output.set("EUSK_I", hasEUSK_I_MODChanged);
  output.set("EUSK_W", hasEUSK_W_MODChanged);
  // Log other date fields...
}

main();