# frozen_string_literal: true

require 'scraped'

# A Wikipedia page with a list of officeholders
class WikipediaOfficeholderPage < Scraped::HTML
  field :positionholders do
    office_holders_with_replacements
  end

  private

  def tables_with_header(str)
    noko.xpath(format('.//table[.//th[contains(
      translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"),
    "%s")]]', str))
  end

  def raw_office_holders
    @raw_office_holders ||= begin
      wanted_tables.xpath('.//tr[td]').map { |td| fragment(td => HolderItem) }.reject(&:empty?).map(&:to_h).uniq(&:to_s)
    end
  end

  def office_holders_with_replacements
    raw_office_holders.each_cons(2) do |prev, cur|
      cur[:replaces] = prev[:id]
      prev[:replaced_by] = cur[:id]
    end
    raw_office_holders
  end
end
