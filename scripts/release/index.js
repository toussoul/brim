/* @noflow */

const notarize = require("electron-notarize").notarize;
const program = require("commander")
const pack = require("./pack")
const install = require("./install")

program
  .option("--win32", "Release for Windows")
  .option("--darwin", "Release for macOS")
  .option("--sign", "Sign package (macOS only)", false)
  .option("--notarize", "Notarize package (macOS only)", false)
  .action(function(cmd) {
      if (cmd.darwin) {
          p = pack.darwin(cmd.sign || cmd.notarize)
          if (cmd.notarize) p.then(() => notarize({
            appBundleId: "com.electron.brim",
            appPath: "dist/packages/Brim-darwin-x64/Brim.app",
            appleId: process.env.MACOS_APPLEID_USER,
            appleIdPassword: process.env.MACOS_APPLEID_PASSWORD,
          }))
          p.then(() => install.darwin())
      }
    if (cmd.win32) pack.win32().then(() => install.win32())
  })
  .parse(process.argv)
